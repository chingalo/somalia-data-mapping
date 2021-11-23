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
    // const inputMapping = await appProcess.getInputMappingFile();
    const inputDataMapping = await appProcess.getInputDataMappingFile();
    console.log(inputDataMapping[0]);
    await logsUtil.addLogs('info', 'End of script', 'app');
  } catch (error: any) {
    error = error.message || error;
    console.log({ error });
  }
}
