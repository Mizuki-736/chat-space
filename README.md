# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## membersテーブル

|Column  |Type   |Options|
|--------|-------|-------|
|user_id |integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル

|Column  |Type   |Option|
|--------|-------|------|
|name    |string |null: false|
|group_id|integer|null: false , foreign_key: true|

### Association
- has_many :groups, through: :members
- has_many :messages

## groupsテーブル

|Column    |Type   |Option|
|----------|-------|------|
|group_name|string |null: false|
|user_id   |integer|null: false , foreign_key: true|
|message_id|integer|null: false , foreign_key: true|

### Association
- has_many :users, through: :members
- has_many :messages

## messagesテーブル

|Column    |Type   |Option|
|----------|-------|------|
|text      |text   |null: false|
|user_id   |integer|null: false , foreign_key: true|
|group_id  |integer|null: false , foreign_key: true|
|image     |text   |

### Association
- belongs_to :users
- belongs_to :group
