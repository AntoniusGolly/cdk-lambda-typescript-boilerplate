#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { LegacyWrapperStack } from '../lib/legacy-wrapper-stack';

const app = new cdk.App();
new LegacyWrapperStack(app, 'LegacyWrapperStack');
