import { Request, Response } from "express";
import * as memberService from "../services/memberService";

export const getMembers = async (req: Request, res: Response) => {
  try {
    const { page, limit, sortBy, order, search } = req.query;

    const result = await memberService.getAllMembers({
      page: page ? parseInt(page as string, 10) : undefined,
      limit: limit ? parseInt(limit as string, 10) : undefined,
      sortBy: sortBy as string,
      order: order as "asc" | "desc",
      search: search as string,
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching members", error });
  }
};

export const getMember = async (req: Request, res: Response) => {
  try {
    const member = await memberService.getMemberById(Number(req.params.id));
    if (member) {
      res.status(200).json(member);
    } else {
      res.status(404).json({ message: "Member not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching member", error });
  }
};

export const createMember = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const member = await memberService.createMember(name, email);
    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ message: "Error creating member", error });
  }
};

export const updateMember = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const member = await memberService.updateMember(
      Number(req.params.id),
      name,
      email
    );
    if (member) {
      res.status(200).json(member);
    } else {
      res.status(404).json({ message: "Member not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating member", error });
  }
};

export const deleteMember = async (req: Request, res: Response) => {
  try {
    const member = await memberService.deleteMember(Number(req.params.id));
    if (member) {
      res.status(200).json(member);
    } else {
      res.status(404).json({ message: "Member not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting member", error });
  }
};
