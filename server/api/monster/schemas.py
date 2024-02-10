from typing import List, Optional
from pydantic import BaseModel
from enum import Enum


class MonsterImageType(str, Enum):
    NORMAL = "normal"
    RAGE = "rage"
    ATTACK = "attack"
    HIT = "hit"


class MonsterAttackSchema(BaseModel):
    name: str
    damage: int
    num_of_attack: int
    description: str


class MonsterImageSchema(BaseModel):
    url: str
    image_type: MonsterImageType
    description: str


class MonsterSchema(BaseModel):
    name: str
    level: int
    health: int
    attack: int
    description: str
    attacks: Optional[List[MonsterAttackSchema]] = None
    images: Optional[List[MonsterImageSchema]] = None
