
# SST Dev in monorepo sample

This repo was stubbed out in order to test monorepo type setups for SST dev.
Specifically when your SST projects are using a custom CDK construct from within the same monorepo.

## Files
```
/packages # libs
/packages/myconstructs # Custom CDK constructs
/sites # SST Nextjs Sites using above constructs
```

## Usage
This is just a contrived example that only uses pnpm and nothing like turbo/nx.
The below command will run the dev watch for the constructs and then the sst dev on the site (hardcoded)
```
pnpm run dev
```

## Expectations
It would be amazing is SST would somehow be aware of changes to the imported custom constructs and prompt for updates to the stack.
Currently you have to completely restart `sst dev` with each change to the custom constructs.