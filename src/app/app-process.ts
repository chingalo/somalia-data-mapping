import _ from 'lodash';
import { EXCEL_FILE_CONFIG } from '../configs/excel-file-config';
import { ExcelUtil } from '../utils/excel-util';
import { LogsUtil } from '../utils/logs-util';

export class AppProcess {
  private logsUtil: LogsUtil;
  private inputMappingFileExcelUtil: ExcelUtil;
  private inputDataFileExcelUtil: ExcelUtil;
  private outputDataFileExcelUtil: ExcelUtil;
  constructor() {
    this.logsUtil = new LogsUtil();
    this.inputMappingFileExcelUtil = new ExcelUtil(
      EXCEL_FILE_CONFIG.inputMappingFileName,
      EXCEL_FILE_CONFIG.excelDir,
      EXCEL_FILE_CONFIG.inputMappingFileExtension
    );
    this.inputDataFileExcelUtil = new ExcelUtil(
      EXCEL_FILE_CONFIG.inputDataFileName,
      EXCEL_FILE_CONFIG.excelDir,
      EXCEL_FILE_CONFIG.inputDataFileExtension
    );
    this.outputDataFileExcelUtil = new ExcelUtil(
      EXCEL_FILE_CONFIG.outputDataFileName,
      EXCEL_FILE_CONFIG.excelDir,
      EXCEL_FILE_CONFIG.inputDataFileExtension
    );
  }

  async getInputDataMappingFile() {}

  async getInputMappingFile() {
    const data = [];
    try {
      const jsonData =
        await this.inputMappingFileExcelUtil.getJsonDataFromExcelOrCsvFile();
      data.push(jsonData[EXCEL_FILE_CONFIG.inputMappingFileSheetName] || []);
    } catch (error: any) {
      await this.logsUtil.addLogs(
        'info',
        error.message || error,
        'getInputMappingFile'
      );
    }
    return _.flattenDeep(data);
  }
}
