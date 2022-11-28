import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as iam from "aws-cdk-lib/aws-iam";

const vpcName = "CommonVpc"
const vpcId = "vpc-010eda7a8d6b23ef4"

export class CdkPlayStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = ec2.Vpc.fromLookup(this, vpcName, { vpcId: vpcId })
    const secGrp = newSecurityGroup(this, vpc)

  }
}

function newSecurityGroup(con: Construct, vpc: ec2.IVpc) {
  const testSG = new ec2.SecurityGroup(con, "testSG", {
    vpc: vpc,
    securityGroupName: "TestSecurityGroup",
    description: "Security Group built by CDK",
  })

  testSG.addIngressRule(
      ec2.Peer.ipv4("0.0.0.0/0"),
      ec2.Port.tcp(8080),
      "add port 8080")
  testSG.addIngressRule(
      ec2.Peer.ipv4("151.210.0.0/16"),
      ec2.Port.tcp(80),
      "add port 80 to a restricted range")

  return testSG
}

function newIamRole(con: Construct) {

  const newRole = new iam.Role(con, "", {assumedBy: undefined})

  return newRole
}
