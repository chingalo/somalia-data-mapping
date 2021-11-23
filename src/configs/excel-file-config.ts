import { ExcelFileConfigModel } from '../models/excel-file-config-model';

export const EXCEL_FILE_CONFIG: ExcelFileConfigModel = {
  excelDir: 'excel-file',
  inputMappingFileName: 'Somalia_Tools_Metadata_Mapping',
  inputMappingFileExtension: 'xlsx',
  inputMappingFileSheetName: 'sql MF-04',
  inputMappingOldReferenceColumnName: 'Old data element uid',
  inputMappingNewReferenceColumnName: 'New Data Element UID',
  inputDataFileName: 'MF-04_data',
  inputDataFileExtension: 'csv',
  inputDataDataElementReferenceColumnName: 'dataelement',
  inputDataCategoryOptionComboReferenceColumnName: 'categoryoptioncombouid',
  outputMappedDataFileName: '[Mapped] MF-04_data',
  outputUnMappedDataFileName: '[Un Mapped] MF-04_data'
};
