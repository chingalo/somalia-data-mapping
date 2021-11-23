import _ from 'lodash';
import { AppProcess } from './app/app-process';
import { LogsUtil } from './utils/logs-util';

starApp();

async function starApp() {
  try {
    const logsUtil = new LogsUtil();
    await logsUtil.clearLogs();
    await logsUtil.addLogs('info', 'start an app', 'app');
    const appProcess = new AppProcess();
    const inputMappingConfigs = await appProcess.getInputMappingFile();
    const inputDataMappings = await appProcess.getInputDataMappingFile();
    const { outputMappedData, outputUnMappedData } =
      await appProcess.getOutputMappedData(
        inputMappingConfigs,
        inputDataMappings
      );
    await appProcess.generateMappingReport(
      outputUnMappedData,
      outputMappedData
    );
    await logsUtil.addLogs('info', 'End of script', 'app');
  } catch (error: any) {
    error = error.message || error;
    console.log({ error });
  }
}
