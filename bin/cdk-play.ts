#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkPlayStack } from '../lib/cdk-play-stack';

const envCoreDev  = { account: '136250605156', region: 'ap-southeast-2' };
const envISOPS = { account: '123abc', region: 'ap-southeast-1' };

const app = new cdk.App();
new CdkPlayStack(app, 'CdkPlayStack', {
    env: envCoreDev
});

