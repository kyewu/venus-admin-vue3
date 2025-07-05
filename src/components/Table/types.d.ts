import type { PaginationProps, TableColumnCtx } from 'element-plus'
import type { TableProps } from 'element-plus'

export interface TableColumnType extends Partial<TableColumnCtx<any>> {}
interface PaginationType extends Partial<PaginationProps> {
  align: 'left' | 'center' | 'right',
  total: number
}

export interface VTableProps extends TableProps<any> {
  columns: Array<TableColumnType>
  pagination: PaginationType
}