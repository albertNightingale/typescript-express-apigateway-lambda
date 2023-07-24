## What this is about?
Setting up an express server and deploying it to APIGateway and Lambda with AWS CDK. 

As of the creation date of this code repository, I cannot find any working instructions on how to deploy a Typescript Express server to AWS Lambda. This repository is an attempt to create a working example of how to do this.

AWS lambda does not support typescript, so if your handler is inside a .ts file, the lambda will throw an error, indicating it cannot find module named "handler". Therefore, what you need to do is to compile your typescript code to javascript, and then deploy the javascript code to lambda. 

In the `aws-express-stack` code, it is looking for handlers in the `compiled_code/src` folder. The `compile_code` is obtained by the `npm run build` command, where the typescript is compiled to javascript. 

Just the compiled code will not work, you also need to install the node modules in the `compiled_code/src` folder. This is done by copying the `package.json` file from the `src` folder to the `compiled_code/src` folder, and then running `npm install` in the `compiled_code` folder. This means you need to have another `package.json` file inside the src folder.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

