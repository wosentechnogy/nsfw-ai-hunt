async (page) => {
  const baseUrl = "http://127.0.0.1:3001";
  const results = [];
  const consoleErrors = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });

  function urlFor(path) {
    return `${baseUrl}${path}`;
  }

  async function inspectPage(name, path, expected) {
    const response = await page.goto(urlFor(path), {
      waitUntil: "domcontentloaded",
      timeout: 30000
    });
    const state = await page.evaluate(() => ({
      href: window.location.href,
      path: window.location.pathname,
      title: document.title,
      h1: document.querySelector("h1")?.textContent?.trim() ?? "",
      bodyText: document.body.innerText
    }));

    const status = response?.status() ?? 0;
    const matchesPath = expected.path ? state.path === expected.path : true;
    const matchesTitle = expected.title ? state.title.includes(expected.title) : true;
    const matchesText = expected.text ? state.bodyText.includes(expected.text) : true;

    if (status >= 400 || !matchesPath || !matchesTitle || !matchesText) {
      throw new Error(
        `${name} failed: ${JSON.stringify({
          status,
          expected,
          actual: {
            href: state.href,
            path: state.path,
            title: state.title,
            h1: state.h1
          }
        })}`
      );
    }

    results.push({
      name,
      status,
      path: state.path,
      title: state.title,
      h1: state.h1
    });
  }

  async function assertMobileFits(name, path) {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(urlFor(path), {
      waitUntil: "domcontentloaded",
      timeout: 30000
    });
    const metrics = await page.evaluate(() => ({
      innerWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth
    }));

    if (metrics.scrollWidth > metrics.innerWidth + 1) {
      throw new Error(`${name} has horizontal overflow: ${JSON.stringify(metrics)}`);
    }

    results.push({
      name,
      mobileFits: true,
      ...metrics
    });
  }

  await inspectPage("Homepage", "/", {
    path: "/",
    title: "NSFW AI Hunt",
    text: "Find adult AI tools"
  });
  await inspectPage("Tool directory", "/tools", {
    path: "/tools",
    title: "Adult AI Tools Directory",
    text: "Adult AI tools directory"
  });
  await inspectPage("Tool detail", "/tools/candy-ai", {
    path: "/tools/candy-ai",
    title: "Candy AI",
    text: "Feature matrix"
  });
  await inspectPage("Category page", "/category/ai-girlfriend-apps", {
    path: "/category/ai-girlfriend-apps",
    title: "AI girlfriend apps",
    text: "Ranking table"
  });
  await inspectPage("Comparison page", "/compare/candy-ai-vs-nomi-ai", {
    path: "/compare/candy-ai-vs-nomi-ai",
    title: "Candy AI vs Nomi AI",
    text: "Feature comparison"
  });
  await inspectPage("Best page", "/best/ai-girlfriend-apps", {
    path: "/best/ai-girlfriend-apps",
    title: "AI girlfriend apps",
    text: "Ranking methodology"
  });
  await inspectPage("Alternatives page", "/alternatives/candy-ai", {
    path: "/alternatives/candy-ai",
    title: "Candy AI alternatives",
    text: "Recommended alternatives"
  });
  await inspectPage("Pricing page", "/pricing/candy-ai", {
    path: "/pricing/candy-ai",
    title: "Candy AI pricing",
    text: "Pricing snapshot"
  });
  await inspectPage("Coupon page", "/coupons/candy-ai", {
    path: "/coupons/candy-ai",
    title: "Candy AI coupons",
    text: "No confirmed coupon"
  });
  await inspectPage("Admin login protection", "/admin", {
    path: "/admin/login",
    title: "Admin login",
    text: "Admin login"
  });

  const redirectResponse = await page.goto(urlFor("/go/candy-ai"), {
    waitUntil: "commit",
    timeout: 30000
  });
  const redirectUrl = page.url();
  const parsedRedirectUrl = new URL(redirectUrl);
  if (parsedRedirectUrl.protocol !== "https:" || parsedRedirectUrl.hostname === "127.0.0.1") {
    throw new Error(`Affiliate redirect failed: ${redirectUrl}`);
  }
  results.push({
    name: "Affiliate redirect",
    status: redirectResponse?.status() ?? 0,
    href: redirectUrl
  });

  await assertMobileFits("Homepage mobile", "/");
  await assertMobileFits("Directory mobile", "/tools");
  await assertMobileFits("Comparison mobile", "/compare/candy-ai-vs-nomi-ai");
  await assertMobileFits("Tool detail mobile", "/tools/candy-ai");

  if (consoleErrors.length > 0) {
    throw new Error(`Browser console errors detected: ${JSON.stringify(consoleErrors)}`);
  }

  return { results, consoleErrors };
}
