from django.test import TestCase
from .models import Monster, MonsterAttack, MonsterImage
from .serializers import MonsterSerializer


class MonsterModelTestCase(TestCase):
    def setUp(self):
        # Create a Monster instance
        self.monster = Monster.objects.create(
            name="Dragon",
            level=5,
            health=500,
            attack=150,
            description="A fierce dragon",
        )

    def test_monster_creation(self):
        self.assertEqual(self.monster.name, "Dragon")
        self.assertEqual(self.monster.level, 5)
        self.assertEqual(self.monster.health, 500)
        self.assertEqual(self.monster.attack, 150)
        self.assertEqual(self.monster.description, "A fierce dragon")


class MonsterAttackModelTestCase(TestCase):
    def setUp(self):
        # First, create a Monster instance
        self.monster = Monster.objects.create(
            name="Dragon",
            level=5,
            health=500,
            attack=150,
            description="A fierce dragon",
        )
        # Then create a MonsterAttack instance
        self.attack = MonsterAttack.objects.create(
            monster=self.monster,
            monster_name="Fire Breath",
            damage=100,
            num_of_attack=1,
            description="A devastating fire breath",
        )

    def test_monster_attack_creation(self):
        self.assertEqual(self.attack.monster, self.monster)
        self.assertEqual(self.attack.monster_name, "Fire Breath")
        self.assertEqual(self.attack.damage, 100)
        self.assertEqual(self.attack.num_of_attack, 1)
        self.assertEqual(self.attack.description, "A devastating fire breath")


class MonsterSerializerTestCase(TestCase):
    def setUp(self):
        # Create a Monster instance with attacks and images
        self.monster = Monster.objects.create(
            name="Dragon",
            level=5,
            health=500,
            attack=150,
            description="A fierce dragon",
        )
        self.attack = MonsterAttack.objects.create(
            monster=self.monster,
            monster_name="Fire Breath",
            damage=100,
            num_of_attack=1,
            description="A devastating fire breath",
        )
        self.image = MonsterImage.objects.create(
            monster=self.monster,
            url="http://example.com/dragon.jpg",
            image_type="normal",
            description="A dragon resting",
        )

        data = Monster.objects.filter(id=self.monster.id).prefetch_related(
            "attacks", "images"
        )[0]
        self.serializer = MonsterSerializer(data)

    def test_contains_expected_fields(self):
        data = self.serializer.data
        self.assertEqual(
            set(data.keys()),
            {
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
            },
        )

    def test_attack_field_content(self):
        data = self.serializer.data
        self.assertEqual(len(data["attacks"]), 1)
        self.assertEqual(data["attacks"][0]["monster_name"], "Fire Breath")

    def test_image_field_content(self):
        data = self.serializer.data
        self.assertEqual(len(data["images"]), 1)
        self.assertEqual(data["images"][0]["url"], "http://example.com/dragon.jpg")
