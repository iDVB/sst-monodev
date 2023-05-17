import * as sst from "sst/constructs";
import * as companyx from "myconstructs";

export function API({ stack }: sst.StackContext) {
  
  new companyx.NextjsSite(stack, "NextjsSite", {});

  stack.addOutputs({ Other: 'Other' })
}
