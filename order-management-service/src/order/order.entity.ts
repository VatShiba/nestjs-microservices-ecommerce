import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  public price!: number;

  @Column({ type: 'integer' })
  public productId!: number;

  @Column({ type: 'integer' })
  public userId!: number;

  @Column({ type: 'integer' })
  public quantity!: number;

  @Column({ type: 'bool', default: false })
  public isCanceld: boolean;

  @Column({ type: 'timestamp', default: null })
  canceled_at: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
