// src/post.rs
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use cosmwasm_std::Addr;
use cw_storage_plus::Item;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Post {
    pub owner: Addr,
    pub text: String,
}

pub const POST: Item<Post> = Item::new("post");