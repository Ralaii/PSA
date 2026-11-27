CREATE TABLE users (
                       id uuid PRIMARY KEY,
                       username varchar(255) NOT NULL UNIQUE,
                       password varchar(255) NOT NULL,
                       role varchar(255) NOT NULL CHECK (role IN ('USER','ADMIN','HR')),
                       status varchar(255) NOT NULL CHECK (status IN ('PENDING','ACTIVE','INACTIVE','SUSPENDED')),
                       created_at timestamp(6)
);

CREATE TABLE sessions (
                          id uuid PRIMARY KEY,
                          user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                          created_at timestamptz(6),
                          expires_at timestamptz(6),
                          last_seen_at timestamptz(6),
                          revoked_at timestamptz(6)
);

CREATE TABLE branches (
                          id uuid PRIMARY KEY,
                          name varchar(255),
                          location varchar(255) NOT NULL,
                          active boolean NOT NULL,
                          created_at timestamp(6)
);

CREATE TABLE positions (
                           id uuid PRIMARY KEY,
                           name varchar(255) NOT NULL UNIQUE
);

CREATE TABLE employees (
                           id uuid PRIMARY KEY,
                           employee_number varchar(255) NOT NULL UNIQUE,
                           user_id uuid UNIQUE REFERENCES users(id),
                           first_name varchar(255) NOT NULL,
                           last_name varchar(255) NOT NULL,
                           middle_name varchar(255),
                           position_id uuid REFERENCES positions(id),
                           department varchar(255),
                           branch_id uuid REFERENCES branches(id),
                           birth_date date,
                           gender varchar(255),
                           civil_status varchar(255) CHECK (civil_status IN ('SINGLE','MARRIED','WIDOWED','SEPARATED','OTHERS')),
                           pagibig_number varchar(255),
                           philhealth_number varchar(255),
                           philsys_number varchar(255),
                           tin_number varchar(255),
                           telephone_number varchar(255),
                           phone_number varchar(255),
                           email varchar(255) NOT NULL UNIQUE,
                           hire_date date NOT NULL,
                           status varchar(255) NOT NULL CHECK (status IN
                                                               ('EMPLOYED','ON_LEAVE','SUSPENDED','RESIGNED','TERMINATED','END_OF_CONTRACT','RETIRED')),
                           employment_category varchar(255) NOT NULL CHECK (employment_category IN
                                                                            ('PROBATIONARY','REGULAR','CONTRACTUAL','INTERN')),
                           contract_start_date date,
                           contract_end_date date,
                           updated_at timestamptz(6),
                           updated_by varchar(255)
);

CREATE TABLE employee_address (
                                  id uuid PRIMARY KEY,
                                  employee_id uuid NOT NULL REFERENCES employees(id),
                                  address_type varchar(255) CHECK (address_type IN ('PRESENT','RESIDENTIAL','PERMANENT')),
                                  house_num varchar(255),
                                  street varchar(255),
                                  subdivision varchar(255),
                                  barangay varchar(255),
                                  city_municipality varchar(255),
                                  province varchar(255),
                                  postal_code varchar(255)
);

CREATE TABLE employee_education (
                                    id uuid PRIMARY KEY,
                                    employee_id uuid NOT NULL REFERENCES employees(id),
                                    education_level varchar(255) NOT NULL CHECK (education_level IN
                                                                                 ('ELEMENTARY','SECONDARY','VOCATIONAL','COLLEGE','GRADUATE')),
                                    school_name varchar(255) NOT NULL,
                                    course varchar(255),
                                    highest_level varchar(255),
                                    honors varchar(255),
                                    year_from integer NOT NULL,
                                    year_to integer
);

CREATE TABLE documents (
                           id uuid PRIMARY KEY,
                           employee_id uuid NOT NULL REFERENCES employees(id),
                           type varchar(255) NOT NULL CHECK (type IN ('CONTRACT','CERTIFICATE','RESUME')),
                           file_name varchar(255),
                           content_type varchar(255),
                           storage_path varchar(255),
                           uploaded_at date
);

CREATE TABLE project (
                         id uuid PRIMARY KEY,
                         project_number varchar(255),
                         name varchar(150) NOT NULL,
                         description text NOT NULL,
                         status varchar(255) CHECK (status IN
                                                    ('PLANNING','PENDING','IN_PROGRESS','ON_HOLD','COMPLETED','CANCELLED')),
                         start_date date,
                         end_date date,
                         created_at timestamp(6),
                         updated_at timestamp(6)
);

CREATE TABLE project_assignment (
                                    id uuid PRIMARY KEY,
                                    employee_id uuid NOT NULL REFERENCES employees(id),
                                    project_id uuid REFERENCES project(id),
                                    project_employee_num varchar(255),
                                    project_position varchar(255),
                                    start_date date NOT NULL,
                                    end_date date,
                                    UNIQUE (project_id, project_employee_num)
);