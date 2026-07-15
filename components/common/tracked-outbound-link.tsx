import Link from "next/link";
import type { ComponentProps } from "react";

type TrackedOutboundLinkProps = Omit<ComponentProps<typeof Link>, "prefetch">;

export function TrackedOutboundLink(props: Readonly<TrackedOutboundLinkProps>) {
  return <Link {...props} prefetch={false} />;
}
