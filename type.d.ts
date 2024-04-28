type User = {
   id: string;
   name: string;
   email: string;
   image: string;
};

type Category = {
   id: number;
   name: string;
   description: string;
   imageUrl: string;
   status: "ENABLE" | "DISABLE";
   createdAt: Date;
   updatedAt: Date;
   // user: User;
};

type Post = {
   id: number;
   title: string;
   summary: string;
   body: string;
   imageUrl: string;
   status: "ENABLE" | "DISABLE";
   commentable: "COMMENTABLE" | "UNCOMMENTABLE";
   publishedAt: Date;
   createdAt: Date;
   updatedAt: Date;
   categoryId: number;
   // category: Category;
   // user: User;
};
