from datetime import datetime,timedelta,timezone


from .models import Ticket




def cron_job():
    cut_off = datetime.now(timezone.utc)-timedelta(minutes=10)
    print("Cron Ran")
    qs = Ticket.objects.filter(status="reserved").filter(
        reserved_at__lt=cut_off
        )

    for q in qs:
        q.status="available"
        q.reserved_at=None
        q.save()

    