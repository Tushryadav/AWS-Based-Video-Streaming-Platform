# 🎥 AWS-Based Video Streaming Platform

A scalable, secure, and globally accessible **video streaming web application** built entirely on AWS cloud infrastructure with a custom frontend using **HTML, CSS, and JavaScript**.

---

## 📌 Project Description

This project demonstrates a full-fledged **video streaming platform** designed with scalability, high availability, and security in mind. It is hosted using AWS services like EC2, S3, CloudFront, Auto Scaling, Load Balancer, and more. The infrastructure is automated using **AWS CloudFormation** to ensure consistent and repeatable deployments.

> ⚙️ The platform can be used as a foundational project for OTT-like systems or media hosting portals.

---

## ☁️ AWS Services Used

| Category              | AWS Services                         |
|-----------------------|--------------------------------------|
| Compute               | EC2, Auto Scaling                    |
| Networking            | VPC, Subnets, Route 53, ELB          |
| Storage & CDN         | S3, CloudFront                       |
| Security              | ACM (SSL/TLS), IAM                   |
| Monitoring            | CloudWatch                           |
| Notifications         | SNS                                  |
| Infrastructure as Code| CloudFormation                       |

---

## 🧭 Architecture Diagram

[Architecture Diagram](./docs/aws-video-streaming-architecture.png)  
*(You can create this diagram using [draw.io](https://draw.io) or [Lucidchart](https://lucidchart.com), then upload it to the `/docs/` folder.)*

---

## 🛠️ Deployment Instructions

### 🔧 Prerequisites

- AWS CLI configured with appropriate IAM permissions
- AWS account with the ability to create resources
- Domain name (preferably managed via Route 53)
- Access to CloudFormation (via AWS Console or CLI)

### 📥 Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/tusharyadav/aws-video-streaming-platform.git
   cd aws-video-streaming-platform
