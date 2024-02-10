from django.db import models
from .schemas import MonsterImageType


# Create your models here.
class Monster(models.Model):
    # name, level, health, attack, description
    name = models.CharField(max_length=100, unique=True)
    level = models.IntegerField()
    health = models.IntegerField()
    attack = models.IntegerField()
    # description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class MonsterAttack(models.Model):
    monster = models.ForeignKey(
        Monster, related_name="attacks", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=100)
    damage = models.IntegerField()
    num_of_attack = models.IntegerField()
    # description = models.TextField()


class MonsterImage(models.Model):
    monster = models.ForeignKey(
        Monster, related_name="images", on_delete=models.CASCADE
    )
    url = models.TextField()
    image_type = models.CharField(
        max_length=10, choices=[(tag, tag.value) for tag in MonsterImageType]
    )
    # description = models.TextField()
