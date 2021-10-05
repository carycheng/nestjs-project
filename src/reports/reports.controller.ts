import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { request } from 'express';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard'; 

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService) {}

    @Post()
    @UseGuards(AuthGuard)
    createReport(@Body() body: CreateReportDto) {
        return this.reportsService.create(body);
    }
}
