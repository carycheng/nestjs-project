import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {

    constructor(
        @InjectRepository(Report) private repo: Repository<Report>
    ) {}

    create(reportDto: CreateReportDto, user: User) {
        const report = this.repo.create(reportDto);
        // Because we have the association set up with TypeOrm. TypeOrm will automatically
        // extract the user id from the user object and assign it to the user column in
        // Report entity.
        report.user = user;
        return this.repo.save(report);
    }

    async changeApproval(id: string, approved: boolean) {
        const report = await this.repo.findOne(id);
        if (!report) {
            throw new NotFoundException('report not found');
        }

        report.approved = approved;
        return this.repo.save(report);
    
    }
}
