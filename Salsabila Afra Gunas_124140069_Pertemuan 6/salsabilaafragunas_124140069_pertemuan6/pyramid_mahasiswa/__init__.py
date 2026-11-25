from pyramid.config import Configurator


def main(global_config, **settings):
    """Application factory untuk aplikasi RESTful API Pyramid."""
    with Configurator(settings=settings) as config:
        config.include('.models')
        config.include('.routes')
        config.scan('.views')
    return config.make_wsgi_app()
