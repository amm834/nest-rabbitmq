# Setup Mongo Replica Set

Open Mongo Config File.

```bash
nvim /etc/mongod.conf
```

# Setting Up Replication

## Syntax

```yaml
replication:
  oplogSizeMB: <int>
  replSetName: <string>
  enableMajorityReadConcern: <boolean>
```

## Configuration

```yaml
replication:
  oplogSizeMB: 2000
  replSetName: rs0
  enableMajorityReadConcern: false
```

## Set Replication Set in Mongo URI

```dotenv
mongodb://localhost:27017/rabbitmq&replicaSet=rs0
```

## Running Mongo DB

```bash
mongod --dbpath=data/db --replSet rs0

```

## Initiate Replication Set

```bash
mongosh
use database_name
rs.initiate()
```

