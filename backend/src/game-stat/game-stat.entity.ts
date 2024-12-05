import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class GameStat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  playerId: string;

  @Column()
  nickname: string;

  @Column()
  profileImage: string;

  @Column({ type: 'timestamp' }) createdAt: Date;

  @Column({ type: 'timestamp' }) updatedAt: Date;

  @Column()
  score: number;
}
