import type { ExecutorContext } from '@nrwl/devkit';
import { copyAssets } from '@nrwl/js'
import { esbuildExecutor, EsBuildExecutorOptions } from '@nrwl/esbuild';

export default async function* buildExecutor(
  options: EsBuildExecutorOptions,
  context: ExecutorContext
) {

  if (options.watch) {
    let copied = false;

    for await (const result of esbuildExecutor(options, context)) {
      if (!copied) {
        await copyAssets({
          assets: options.assets,
          outputPath: options.outputPath,
          watch: false
        }, context);
        copied = true;
      }
      yield result;
    }
  }
  else
    return yield* esbuildExecutor(options, context);
}
