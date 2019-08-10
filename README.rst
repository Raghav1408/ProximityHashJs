ProximityHash: Geohashes in Proximity (with the option of compression using Georaptor_)
=======================================================================================

**ProximityHash** generates a set of geohashes that cover a circular area, given the center coordinates and the radius.
It also has an additional option to use **GeoRaptor** that creates the best combination of geohashes across various
levels to represent the circle, starting from the highest level and iterating till the optimal blend is brewed. Result
accuracy remains the same as that of the starting geohash level, but data size reduces considerably, thereby improving
speed and performance.


.. image:: https://raw.github.com/raghav1408/proximityHashJs/master/images/proximityhash.png
   :width: 480
   :height: 320

.. image:: https://raw.github.com/raghav1408/proximityHashJs/master/images/proximityhash_georaptor.png
   :width: 480
   :height: 320
