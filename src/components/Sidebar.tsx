import Link from "next/link";

import SidebarItems from "./SidebarItems";
import {Avatar, AvatarFallback} from "./ui/avatar";

import {AuthSession, getUserAuth} from "@/lib/auth/utils";

import Image from 'next/image';
import {Divider} from "@tremor/react";
import dynamic from "next/dynamic";

const Notifications = dynamic(() => import('@/components/Notifications'), { ssr: false });

const Sidebar = async () => {
  const session = await getUserAuth();
  if (session.session === null) return null;

  return (
    <aside className="h-screen min-w-52 bg-muted hidden md:block p-4 pt-8 border-r border-border shadow-inner">
      <div className="flex flex-col justify-between h-full">
        <div className="space-y-4">
          <div>
            <Link href="/eventos">
              <Image src={`/divisor_sabio.png`} className="ml-4 rounded" height="50" width="50"
                     alt="El pensador rodeado de dos D y S doradas"/>
            </Link>
            <p className="text-lg font-semibold ml-4">Divisor Sabio</p>
          </div>
          <SidebarItems/>
          <Divider/>
          <Notifications/>
        </div>
        <UserDetails session={session}/>
      </div>
    </aside>
  );
};

export default Sidebar;

const UserDetails = ({session}: { session: AuthSession }) => {
  if (session.session === null) return null;
  const {user} = session.session;

  if (!user?.name || user.name.length == 0) return null;

  return (
    <Link href="/account">
      <div className="flex items-center justify-between w-full border-t border-border pt-4 px-2">
        <div className="text-muted-foreground">
          <p className="text-xs">{user.name ?? "John Doe"}</p>
          <p className="text-xs font-light pr-4">
            {user.email ?? "john@doe.com"}
          </p>
        </div>
        <Avatar className="h-10 w-10">
          <AvatarFallback className="border-border border-2 text-muted-foreground">
            {user.name
              ? user.name
                ?.split(" ")
                .map((word) => word[0].toUpperCase())
                .join("")
              : "~"}
          </AvatarFallback>
        </Avatar>
      </div>
    </Link>
  );
};
