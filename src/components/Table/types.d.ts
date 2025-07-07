import type { Component } from 'vue'
import type { PaginationProps, TableColumnCtx } from 'element-plus'
import type { TableProps } from 'element-plus'

export interface TableColumnType extends Partial<TableColumnCtx<any>> {
  defaultSlot?: typeof Component,
  headerSlot?: typeof Component
  children?: Array<TableColumnType>
}
interface PaginationType extends Partial<PaginationProps> {
  align?: 'left' | 'center' | 'right',
  total?: number,
  defaultSlot?: typeof Component
}

export interface VTableProps extends TableProps<any> {
  columns: Array<TableColumnType>
  pagination?: PaginationType
  adaptiveHeight?: boolean | number
  draggableCol?: boolean
  draggableRow?: boolean
}

export type TableEventsType = {
  select: [selection: any, row: any]
  'select-all': [selection: any]
  'selection-change': [selection: any]
  'cell-mouse-enter': [row: any, column: any, cell: any, event: Event]
  'cell-mouse-leave': [row: any, column: any, cell: any, event: Event]
  'cell-click': [row: any, column: any, cell: any, event: Event]
  'cell-dblclick': [row: any, column: any, cell: any, event: Event]
  'cell-contextmenu': [row: any, column: any, cell: any, event: Event]
  'row-click': [row: any, column: any, event: Event]
  'row-contextmenu': [row: any, column: any, event: Event]
  'row-dblclick': [row: any, column: any, event: Event]
  'header-click': [column: any, event: Event]
  'header-contextmenu': [column: any, event: Event]
  'sort-change': [{ column: any; prop: string; order: string }]
  'filter-change': [filters: any]
  'current-change': [currentRow: any, oldCurrentRow: any]
  'header-dragend': [newWidth: number, oldWidth: number, column: any, event: Event]
  'expand-change': [row: any, expandedRows: any]
  scroll: ({ scrollLeft: number, scrollTop: number }) => void
}

type PaginationCallFunc = (value: number) => void

export type PaginationEventsType = {
  'page-current-change': [PaginationCallFunc]
  'page-size-change': [PaginationCallFunc]
  'page-prev-click': [PaginationCallFunc]
  'page-next-click': [PaginationCallFunc]
  change: [(currentPage: number, pageSize: number) => void]
}

type TableExtendEvents = {
  'drag-row-change': [row: any]
  'drag-col-change': [col: any]
}

export type TableEmitsType = TableEventsType & PaginationEventsType & TableExtendEvents