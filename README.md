# DB設計

## groups_usersテーブル

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
|name    |string |null: false, unique: true|
|email   |string |null: false, |
|encrypted_password|string| null: false|

### Association
- has_many :groups_users
- has_many :groups, through: :groups_users
- has_many :messages

## groupsテーブル

|Column    |Type   |Option|
|----------|-------|------|
|name      |string |null: false|

### Association
- has_many :groups_users
- has_many :users, through: :groups_users
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
