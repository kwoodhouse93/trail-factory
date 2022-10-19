# Trail Factory

Load GPX files from the local file system. View, select, edit and combine the tracks contained within, and export them to a postgres database.

This is an internal tool to make it easier to add routes to Trail Tracker - see [kwoodhouse93/trail-progress](https://github.com/kwoodhouse93/trail-progress) for more on the project.

## Files
This project is intended to be run locally, for interacting with files on your local filesystem.

You should be able to run it on a server if you wish - just be aware that it will only find files on the _server's_ filesystem - not the client's.

## Postgres exporter
Note that the postgres exporter assumes a specific table name and schema.

**Table name**  
`routes`

**Schema**  
```sql
id text
display_name text
description text
track geography
```

> **Note**  
> `geography` is a type provided by the PostGIS extension

The information above only describes what this project assumes of the table. It does not fully describe it. It may have other columns, default values, constraints, indexes, triggers, etc.
