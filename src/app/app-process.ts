import _ from 'lodash';
import { EXCEL_FILE_CONFIG } from '../configs/excel-file-config';
import { AppUtil } from '../utils/app-util';
import { ExcelUtil } from '../utils/excel-util';
import { LogsUtil } from '../utils/logs-util';

export class AppProcess {
  private logsUtil: LogsUtil;
  private inputMappingFileExcelUtil: ExcelUtil;
  private inputDataFileExcelUtil: ExcelUtil;
  private outputMappedDataFileExcelUtil: ExcelUtil;
  private outputUnMappedDataFileExcelUtil: ExcelUtil;
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
    this.outputMappedDataFileExcelUtil = new ExcelUtil(
      EXCEL_FILE_CONFIG.outputMappedDataFileName,
      EXCEL_FILE_CONFIG.excelDir,
      EXCEL_FILE_CONFIG.inputDataFileExtension
    );
    this.outputUnMappedDataFileExcelUtil = new ExcelUtil(
      EXCEL_FILE_CONFIG.outputUnMappedDataFileName,
      EXCEL_FILE_CONFIG.excelDir,
      EXCEL_FILE_CONFIG.inputDataFileExtension
    );
  }

  async generateMappingReport(
    outputUnMappedData: any[],
    outputMappedData: any[]
  ) {
    try {
      if (outputUnMappedData.length > 0) {
        await this.outputUnMappedDataFileExcelUtil.writeToSingleSheetExcelFile(
          outputUnMappedData
        );
      }
      if (outputMappedData.length > 0) {
        await this.outputMappedDataFileExcelUtil.writeToSingleSheetExcelFile(
          outputMappedData
        );
      }
    } catch (error: any) {
      await this.logsUtil.addLogs(
        'error',
        error.message || error,
        'getOutputMappedData'
      );
    }
  }

  async getOutputMappedData(
    inputMappingConfigs: any[],
    inputDataMappings: any[]
  ): Promise<{ outputUnMappedData: any[]; outputMappedData: any[] }> {
    let outputMappedData = [];
    let outputUnMappedData = [];
    try {
      for (const inputDataMapping of inputDataMappings) {
        const inputDataOldReference =
          inputDataMapping.inputDataOldReference || '';
        const mappingConfig = _.find(
          inputMappingConfigs || [],
          (config) =>
            config[EXCEL_FILE_CONFIG.inputMappingOldReferenceColumnName] ===
            inputDataOldReference
        );
        if (mappingConfig) {
          const inputDataOldReferences = `${
            mappingConfig[EXCEL_FILE_CONFIG.inputMappingNewReferenceColumnName]
          }`.split('.');
          const dataElement =
            inputDataOldReferences.length > 0 ? inputDataOldReferences[0] : '';
          const categoryOptionCombo =
            inputDataOldReferences.length > 1 ? inputDataOldReferences[1] : '';
          if (dataElement != '') {
            inputDataMapping[
              EXCEL_FILE_CONFIG.inputDataDataElementReferenceColumnName
            ] = dataElement;
            inputDataMapping[
              EXCEL_FILE_CONFIG.inputDataCategoryOptionComboReferenceColumnName
            ] = categoryOptionCombo;
            outputMappedData.push(inputDataMapping);
          } else {
            outputUnMappedData.push(inputDataMapping);
          }
        } else {
          outputUnMappedData.push(inputDataMapping);
        }
      }
    } catch (error: any) {
      await this.logsUtil.addLogs(
        'error',
        error.message || error,
        'getOutputMappedData'
      );
    }
    return {
      outputMappedData: _.map(_.flattenDeep(outputMappedData), (data) =>
        _.omit(data, 'inputDataOldReference')
      ),
      outputUnMappedData: _.map(_.flattenDeep(outputUnMappedData), (data) =>
        _.omit(data, 'inputDataOldReference')
      )
    };
  }

  async getInputDataMappingFile() {
    let data = [];
    try {
      const jsonData =
        await this.inputDataFileExcelUtil.getJsonDataFromExcelOrCsvFile();
      data = _.map(_.keys(jsonData), (sheetName) => jsonData[sheetName]);
    } catch (error: any) {
      await this.logsUtil.addLogs(
        'error',
        error.message || error,
        'getInputDataMappingFile'
      );
    }
    return _.map(_.flattenDeep(data), (dataObj) => {
      const dataelement =
        dataObj[EXCEL_FILE_CONFIG.inputDataDataElementReferenceColumnName];
      const categoryoptioncombo =
        dataObj[
          EXCEL_FILE_CONFIG.inputDataCategoryOptionComboReferenceColumnName
        ];
      const inputDataOldReference = `${dataelement}.${categoryoptioncombo}`;
      return {
        ...dataObj,
        inputDataOldReference,
        lastupdated: AppUtil.getExcelDateToJSDate(dataObj.lastupdated)
      };
    });
  }

  async getInputMappingFile() {
    const data = [];
    try {
      const jsonData =
        await this.inputMappingFileExcelUtil.getJsonDataFromExcelOrCsvFile();
      data.push(jsonData[EXCEL_FILE_CONFIG.inputMappingFileSheetName] || []);
    } catch (error: any) {
      await this.logsUtil.addLogs(
        'error',
        error.message || error,
        'getInputMappingFile'
      );
    }
    return _.filter(
      _.flattenDeep(data),
      (dataObj) =>
        _.keys(dataObj).includes(
          EXCEL_FILE_CONFIG.inputMappingNewReferenceColumnName
        ) &&
        _.keys(dataObj).includes(
          EXCEL_FILE_CONFIG.inputMappingOldReferenceColumnName
        )
    );
  }
}
