#!/bin/bash
# Create multiple PostgreSQL databases with different users
# Usage: POSTGRES_MULTIPLE_DATABASES="db1:user1:pass1,db2:user2:pass2"

set -e
set -u

function create_user_and_database() {
    local database=$1
    local user=$2
    local password=$3

    echo "  Creating user '$user' and database '$database'"

    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
        CREATE USER $user WITH PASSWORD '$password';
        CREATE DATABASE $database;
        GRANT ALL PRIVILEGES ON DATABASE $database TO $user;
        \c $database
        GRANT ALL ON SCHEMA public TO $user;
EOSQL
}

if [ -n "${POSTGRES_MULTIPLE_DATABASES:-}" ]; then
    echo "Multiple database creation requested: $POSTGRES_MULTIPLE_DATABASES"

    for db_config in $(echo $POSTGRES_MULTIPLE_DATABASES | tr ',' ' '); do
        IFS=':' read -r database user password <<< "$db_config"
        create_user_and_database "$database" "$user" "$password"
    done

    echo "Multiple databases created successfully"
fi
