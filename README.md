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

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false|
|password|string|null: false|
|group_id|integer|null: false|
### Association
- has_many :messages
- has_many :groups, through: :group_user

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|image|string||
|body|text|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|intenger|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## groupテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|group_id|integer|null: false, foreign_key: true
### Association
- has_many :users :
- has_many :messages, through: :group_userテーブル

## group_userテーブル
|Coulmn|Type|Option|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|intenger|null: false, foreign_key: true|
### Association
-belongs_to :user
-belongs_to :group