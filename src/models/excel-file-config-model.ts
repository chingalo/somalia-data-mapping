export interface ExcelFileConfigModel {
  excelDir: string;
  inputMappingFileName: string;
  inputMappingFileExtension: string;
  inputMappingFileSheetName: string;
  inputMappingOldReferenceColumnName: string;
  inputMappingNewReferenceColumnName: string;
  inputDataFileName: string;
  inputDataFileExtension: string;
  inputDataDataElementReferenceColumnName: string;
  inputDataCategoryOptionComboReferenceColumnName: string;
  outputDataFileName: string;
}
