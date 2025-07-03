
// "use client";
// import { useUserStore } from "@/store/useSessionStore";
// import { User } from "@prisma/client";
// import { useEffect } from "react";

// type InitUserClientProps = {
//   user: User
// };

// export default function InitUserClient({ user }: InitUserClientProps) {
//   const setUser = useUserStore((state:User) => state.setUser);

//   useEffect(() => {
//     if (user) setUser(user);
//   }, [user]);

//   return null;
// }
