import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Redis from 'ioredis';
import { Course } from './course.schema';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private model: Model<Course>,
    @Inject('REDIS') private redis: Redis,
  ) {}

  async findAll() {
    const key = 'courses:all';

    const cached = await this.redis.get(key);
    if (cached) {
      console.log('CACHE HITsssss');
      return JSON.parse(cached);
    }

    console.log('DB HIT');
    const courses = await this.model.find().lean();

    await this.redis.set(key, JSON.stringify(courses), 'EX', 120);

    return courses;
  }

  async findOne(id: string) {
    const key = `courses:${id}`;

    const cached = await this.redis.get(key);
    if (cached) {
      console.log('CACHE HIT');
      return JSON.parse(cached);
    }

    console.log('DB HIT');
    const course = await this.model.findById(id).lean();

    await this.redis.set(key, JSON.stringify(course), 'EX', 300);

    return course;
  }

  async create(data: any) {
    const course = await this.model.create(data);
    await this.redis.del('courses:all');
    return course;
  }

  async update(id: string, data: any) {
    await this.model.findByIdAndUpdate(id, data);

    await this.redis.del(`courses:${id}`);
    await this.redis.del('courses:all');

    return { message: 'updated & cache cleared' };
  }
}
