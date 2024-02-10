from ninja import NinjaAPI
from monster.api import router as monster_router


api = NinjaAPI()


api.add_router("monsters/", monster_router)
