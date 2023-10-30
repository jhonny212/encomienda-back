import { Request, Response } from 'express';
import {prisma} from '../models/database'
import {paginator} from '../utils/paginator';
import { updateCleaner } from '../utils/crud';

export const inital = async (req:Request) =>{}

export const moveOrder =async (req:Request) => {}

export const updateStatusOrder = async (req:Request) => {}

export const generateQrCode = async (req:Request) => {}

export const getTracking = async (req:Request) => {}