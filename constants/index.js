export const sidebarLinks = [
    {
      imgURL: "/assets/home.svg",
      route: "/",
      label: "Hem",
    },
    {
      imgURL: "/assets/search.svg",
      route: "/search",
      label: "Sök",
    },
    {
      imgURL: "/assets/heart.svg",
      route: "/activity",
      label: "Aktivitet",
    },
    {
      imgURL: "/assets/create.svg",
      route: "/create-thread",
      label: "Skapa tråd",
    },
    {
      imgURL: "/assets/community.svg",
      route: "/communities",
      label: "Gemenskaper",
    },
    {
      imgURL: "/assets/user.svg",
      route: "/profile",
      label: "Profil",
    },
  ];
  
  export const profileTabs = [
    { value: "threads", label: "Trådar", icon: "/assets/reply.svg" },
    { value: "replies", label: "Kommentarer", icon: "/assets/members.svg" },
    { value: "tagged", label: "Taggningar", icon: "/assets/tag.svg" },
  ];
  
  export const communityTabs = [
    { value: "threads", label: "Trådar", icon: "/assets/reply.svg" },
    { value: "members", label: "Medlemmar", icon: "/assets/members.svg" },
    { value: "requests", label: "Förfrågningar", icon: "/assets/request.svg" },
  ];