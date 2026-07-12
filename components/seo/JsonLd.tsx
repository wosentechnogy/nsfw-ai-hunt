type JsonLdProps = Readonly<{
  data: unknown;
}>;

export function JsonLd({ data }: JsonLdProps) {
  const serializedData = (JSON.stringify(data) ?? "null")
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializedData
      }}
    />
  );
}
