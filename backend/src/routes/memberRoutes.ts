import { Router } from "express";
import * as memberController from "../controllers/memberController";

const router = Router();

router.get("/members", memberController.getMembers);
router.get("/members/:id", memberController.getMember);
router.post("/members", memberController.createMember);
router.put("/members/:id", memberController.updateMember);
router.delete("/members/:id", memberController.deleteMember);

export default router;
