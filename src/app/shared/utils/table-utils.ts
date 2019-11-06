export class TableUtils {
    
    public static deleteRowDataTable (id: string, dataSource: any, paginator: any) {
        const itemIndex = dataSource.data.findIndex(obj => obj['id'] === id);
        dataSource.data.splice(itemIndex, 1);
        dataSource.paginator = paginator;
      }
}