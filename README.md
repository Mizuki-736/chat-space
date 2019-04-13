# DB設計

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
|group_id|integer|null: false|

### Association
- has_many :menbers
- has_many :groups, through: :members
- has_many :messages

## groupsテーブル

|Column    |Type   |Option|
|----------|-------|------|
|group_name|string |null: false|
|user_id   |integer|null: false , foreign_key: true|
|message_id|integer|null: false , foreign_key: true|

### Association
- has_many :menbers
- has_many :users, through: :members
- has_many :messages

## messagesテーブル

|Column    |Type   |Option|
|----------|-------|------|
|content   |string |null: false|
|user_id   |integer|null: false , foreign_key: true|
|group_id  |integer|null: false , foreign_key: true|
|image     |string |

### Association
- belongs_to :user
- belongs_to :group
