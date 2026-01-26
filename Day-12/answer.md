Schema Design in Relational Databases
1. What schema design is and what a database schema represents

Schema design is the process of planning how data will be stored in a database before actually creating tables or writing backend code.
A database schema represents the complete structure of the database. It defines:

Tables

Columns

Data types

Relationships between tables

Constraints and rules

In simple words, a schema is the blueprint of the database.

2. Why schema design is required before writing backend code

Schema design is required first because backend code depends on the database structure.
If tables, columns, and relationships are not clearly defined:

Backend queries will fail

Data handling becomes confusing

Frequent changes will break the application

A well-designed schema makes backend development clean, predictable, and stable.

3. How poor schema design affects data consistency, maintenance, and scalability

Poor schema design causes many problems:

Data inconsistency: Same data stored in multiple places can become different

Maintenance issues: Making changes becomes difficult and risky

Scalability problems: As data grows, queries become slow and inefficient

This leads to more bugs and poor application performance.

4. What validations are in schema design and why databases enforce them

Validations are rules applied to database columns to ensure correct data is stored.

Common validations:

NOT NULL – prevents empty values

UNIQUE – avoids duplicate values

PRIMARY KEY – uniquely identifies each record

DEFAULT – sets a value automatically if none is given

Databases enforce validations to protect data integrity even if backend code makes mistakes.

5. Difference between a database schema and a database table

A database schema is the overall structure or design of the database.

A database table is a part of the schema that stores actual data in rows and columns.

Schema is the plan, tables are the actual storage units.

6. Why a table should represent only one entity

Each table should represent only one real-world entity such as a user, product, or order.
This keeps data:

Organized

Easy to understand

Easy to update

Mixing multiple entities in one table causes duplication and confusion.

7. Why redundant or derived data should be avoided

Redundant data means storing the same data in multiple places.
Derived data means storing values that can be calculated from existing data.

Storing such data:

Creates inconsistency

Increases storage usage

Makes updates error-prone

It is better to store original data and calculate derived values when needed.

8. Importance of choosing correct data types

Choosing the correct data type:

Saves storage space

Improves performance

Prevents invalid data

Makes data meaning clear

For example:

Use INTEGER for numbers

Use TEXT for names

Use DATE or TIMESTAMP for dates and time

Wrong data types can cause errors and data loss.