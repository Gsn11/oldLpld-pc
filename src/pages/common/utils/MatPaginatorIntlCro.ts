import { MatPaginatorIntl } from '@angular/material';

export class MatPaginatorIntlCro extends MatPaginatorIntl {
    itemsPerPageLabel = '';
    nextPageLabel = '下一页';
    previousPageLabel = '上一页';
    firstPageLabel = '第一页';
    lastPageLabel = '最后一页';
    getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
            return `0 到 + ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `第 ${(startIndex + 1)} - ${endIndex} 条，共 ${length} 条`;
    }
}
