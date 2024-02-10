from rest_framework import serializers
from .models import Monster, MonsterAttack, MonsterImage


class MonsterAttackSerializer(serializers.ModelSerializer):
    class Meta:
        model = MonsterAttack
        fields = "__all__"


class MonsterImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = MonsterImage
        fields = "__all__"


class MonsterSerializer(serializers.ModelSerializer):
    attacks = MonsterAttackSerializer(many=True)
    images = MonsterImageSerializer(many=True)

    class Meta:
        model = Monster
        fields = [
            "id",
            "name",
            "level",
            "health",
            "attack",
            "description",
            "created_at",
            "updated_at",
            "attacks",
            "images",
        ]

    def create(self, validated_data):
        attacks_data = validated_data.pop("attacks", [])
        images_data = validated_data.pop("images", [])
        monster = Monster.objects.create(**validated_data)
        for attack_data in attacks_data:
            MonsterAttack.objects.create(monster=monster, **attack_data)
        for image_data in images_data:
            MonsterImage.objects.create(monster=monster, **image_data)
        return monster

    def update(self, instance, validated_data):
        attacks_data = validated_data.pop("attacks", [])
        images_data = validated_data.pop("images", [])

        instance.name = validated_data.get("name", instance.name)
        instance.level = validated_data.get("level", instance.level)
        instance.health = validated_data.get("health", instance.health)
        instance.attack = validated_data.get("attack", instance.attack)
        instance.description = validated_data.get("description", instance.description)
        instance.save()

        # For simplicity, this example does not handle updating or deleting existing attacks/images.
        # You might need to handle this depending on your application's requirements.

        for attack_data in attacks_data:
            MonsterAttack.objects.create(monster=instance, **attack_data)

        for image_data in images_data:
            MonsterImage.objects.create(monster=instance, **image_data)

        return instance
