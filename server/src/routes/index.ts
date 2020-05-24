import { Router } from "express";

import users from "./users";
import posts from "./posts";

const router = Router();

router.use("/api/users", users);
router.use("/api/posts", posts);

export default router;