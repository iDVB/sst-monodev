
import { Construct } from 'constructs'
import * as sst from 'sst/constructs'
import { execSync } from 'child_process'

export class NextjsSite extends sst.NextjsSite {

  constructor(scope: Construct, id: string, props: sst.NextjsSiteProps) {
    const { stage, name: service, local: isLocal } = scope.node.root as sst.App
    const stack = sst.Stack.of(scope) as sst.Stack

    const { environment, ...rest } = props

    const SERVICE = service,
      STAGE = stage,
      STACKNAME = stack.stackName,
      GIT_REPOSITORY = getGitRepoName(),
      GIT_BRANCH = stage,
      GIT_SHORT = getGitShort()

    super(scope, id, {
      environment: {
        NEXT_PUBLIC_STACKNAME: STACKNAME,
        NEXT_PUBLIC_GIT_SHORT: GIT_SHORT,
        ...environment,
      },
      ...rest,
    })

    stack.addOutputs({ SERVICE, STAGE, GIT_REPOSITORY, GIT_BRANCH })
  }
}

export const getGitRepoName = (): string =>
  execSync('basename `git rev-parse --show-toplevel`').toString().trim()
export const getGitBranchName = (): string =>
  execSync(`git rev-parse --abbrev-ref HEAD`).toString().trim()
export const getGitShort = (): string => execSync(`git rev-parse --short HEAD`).toString().trim()
export const getServiceName = (): string =>
  execSync(`npm run env | grep "npm_package_name"`).toString().trim().split('=')[1]

const stageFlags = ['prod', 'rc', 'dev'] as const
type StageFlag = typeof stageFlags[number]
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isStageFlag = (x: any): x is StageFlag => stageFlags.includes(x)

export const getStackName = (stage: string): string => `${getServiceName()}-${stage}`

export const getStageFlag = (stage: string): StageFlag => {
  const splitStage = stage.split('-')[0]
  const stageFlag = isStageFlag(splitStage) ? splitStage : 'dev'
  return stageFlag
}

export const getStackTags = () => ({
  SERVICE: getServiceName(),
  GIT_BRANCH: getGitBranchName(),
  GIT_REPOSITORY: getGitRepoName(),
})
