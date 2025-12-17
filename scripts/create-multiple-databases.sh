#!/bin/bash
# Script to create multiple PostgreSQL databases with their own users
# Based on POSTGRES_MULTIPLE_DATABASES environment variable
# Format: db1:user1:pass1,db2:user2:pass2,...

set -e
set -u

function create_user_and_database() {
    local database=$1
    local user=$2
    local password=$3

    echo "Creating user '$user' and database '$database'..."

    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
        -- Create user if not exists
        DO \$\$
        BEGIN
            IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = '$user') THEN
                CREATE USER $user WITH PASSWORD '$password';
            END IF;
        END
        \$\$;

        -- Create database if not exists
        SELECT 'CREATE DATABASE $database'
        WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '$database')\gexec

        -- Grant privileges
        GRANT ALL PRIVILEGES ON DATABASE $database TO $user;
EOSQL

    # Set database owner
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$database" <<-EOSQL
        GRANT ALL ON SCHEMA public TO $user;
        ALTER DATABASE $database OWNER TO $user;
EOSQL

    echo "Database '$database' and user '$user' created successfully."
}

if [ -n "${POSTGRES_MULTIPLE_DATABASES:-}" ]; then
    echo "Creating multiple databases from POSTGRES_MULTIPLE_DATABASES..."

    # Split by comma
    IFS=',' read -ra DBS <<< "$POSTGRES_MULTIPLE_DATABASES"

    for db_config in "${DBS[@]}"; do
        # Split by colon
        IFS=':' read -ra DB_PARTS <<< "$db_config"

        if [ ${#DB_PARTS[@]} -eq 3 ]; then
            create_user_and_database "${DB_PARTS[0]}" "${DB_PARTS[1]}" "${DB_PARTS[2]}"
        else
            echo "Error: Invalid database configuration format: $db_config"
            echo "Expected format: database:user:password"
            exit 1
        fi
    done

    echo "All databases created successfully!"
else
    echo "POSTGRES_MULTIPLE_DATABASES is not set, skipping multiple database creation."
fi
