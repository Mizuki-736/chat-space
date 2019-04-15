# DB設計

## group_usersテーブル

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
- has_many :group_users
- has_many :groups, through: :group_users
- has_many :messages

## groupsテーブル

|Column    |Type   |Option|
|----------|-------|------|
|name      |string |null: false|

### Association
- has_many :group_users
- has_many :users, through: :group_users
- has_many :messages

## messagesテーブル

|Column    |Type   |Option|
|----------|-------|------|
|text      |text   |null: false|
|user_id   |integer|null: false , foreign_key: true|
|group_id  |integer|null: false , foreign_key: true|
|image     |text   |

### Association
- belongs_to :user
- belongs_to :group
